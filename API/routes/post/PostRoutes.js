'use strict';

class PostRoutes {
  async create(req, h) {
    const { payload, user } = req;
    payload.user = user;
    await this.postService.create(payload);
    return { ok: true };
  }

  async like(req, h) {
    const { user, post, params } = req;
    await this.postService.like({
      user,
      post,
      state: params.state
    });
    return { ok: true };
  }
}

module.exports = PostRoutes;