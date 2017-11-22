// @flow

import { schema, normalize as norm } from 'normalizr';

export type Entity = {
  id: string,
  type: 'post' | 'comment' | 'user',
};

type RawNormalizedPayload = {
  entities: {
    sharedEntity: {
      [id: string]: Entity,
    },
  },
  result: Array<string>,
};

export type NormalizedPayload = {
  entities: {
    [id: string]: Entity,
  },
  result: Array<string>,
};

export const AuthorSchema = new schema.Entity('sharedEntity');

export const CommunitySchema = new schema.Entity('sharedEntity');

export const ReplySchema = new schema.Entity('sharedEntity', {
  author: AuthorSchema,
});

ReplySchema.define({ replies: [ReplySchema] });

export const PostSchema = new schema.Entity('sharedEntity', {
  author: AuthorSchema,
  communities: [CommunitySchema],
  replies: [ReplySchema],
});

export function normalize(payload: Entity | Array<Entity>): NormalizedPayload {
  const schema = {
    user: AuthorSchema,
    post: PostSchema,
    comment: ReplySchema,
  }[Array.isArray(payload) ? payload[0].type : payload.type];

  const { entities: { sharedEntity }, result }: RawNormalizedPayload = norm(
    payload,
    Array.isArray(payload) ? [schema] : schema
  );

  return {
    entities: sharedEntity,
    result,
  };
}
