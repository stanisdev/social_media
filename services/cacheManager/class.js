'use strict';

const amqp = require('amqplib/callback_api');
const nanoid = require('nanoid/async');
const EventEmitter = require('events');

class CacheManager {
  constructor({ config }) {
    const { forward, replyTo } = config.cacheManager.queues;
    this.channel = null;
    this.amqEmitter = new EventEmitter();
    this.forwardQueue = forward;
    this.replyToQueue = replyTo;
  }

  async start() {
    this.channel = await new Promise((resolve, reject) => {

      amqp.connect('amqp://localhost', (err, connection) => {
        if (err) {
          console.error('Unable to connect to amqp'); // @todo: use another logger instead "console"
          return reject(err);
        }
        connection.createChannel((err, channel) => {
          if (err) {
            console.error('Unable to create amqp channel');
            return reject(err);
          }
          channel.assertQueue(this.forwardQueue, { durable: true }, (err, ok) => {
            if (err) {
              console.error('Error during creation of the queue ', this.forwardQueue);
              return reject(err);
            }
            channel.assertQueue(this.replyToQueue, { durable: true }, (err, ok) => {
              if (err) {
                console.error('Error during creation of the queue ', this.replyToQueue);
                return reject(err);
              }
              channel.consume(this.replyToQueue, (msg) => {
                const data = JSON.parse(msg.content.toString()); // @todo: add validation
                this.amqEmitter.emit(data.correlationId, data);
    
                channel.ack(msg);
              }, {
                noAck: false
              });

              resolve(channel);
            });
          });
        });
      });
    });
  }

  async sendQuery({ action, data }) {
    const correlationId = await nanoid(15);

    const msg = JSON.stringify({ action, data });
    this.channel.sendToQueue(this.forwardQueue, Buffer.from(msg), {
      persistent: true,
      correlationId,
      replyTo: this.replyToQueue
    });

    await new Promise((resolve, reject) => {
      this.amqEmitter.once(correlationId, (data) => {
        if (data instanceof Object && data.success === true) {
          return resolve(data);
        }
        reject(new Error('Query failed'));
      });
    });
  }
}

module.exports = CacheManager;