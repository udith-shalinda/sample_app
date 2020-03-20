import {
  createKnexCRUDRuntimeContext,
  KnexRuntimeContextConfig
} from "./../new_version/src/runtimeContext"

export const createCRUDResolversRuntimeContext = (
  options: KnexRuntimeContextConfig
) => {
  const { schema, db, pubSub } = options

  const notePubSubContext = {
    pubSub,
    publishCreate: true,
    publishUpdate: true,
    publishDelete: true
  }
  const commentPubSubContext = {
    pubSub,
    publishCreate: true,
    publishUpdate: true,
    publishDelete: true
  }
  const studentPubSubContext = {
    pubSub,
    publishCreate: true,
    publishUpdate: true,
    publishDelete: true
  }
  const parentPubSubContext = {
    pubSub,
    publishCreate: true,
    publishUpdate: true,
    publishDelete: true
  }

  return {
    Note: createKnexCRUDRuntimeContext("Note", schema, db, notePubSubContext),

    Comment: createKnexCRUDRuntimeContext(
      "Comment",
      schema,
      db,
      commentPubSubContext
    ),

    Student: createKnexCRUDRuntimeContext(
      "Student",
      schema,
      db,
      studentPubSubContext
    ),

    Parent: createKnexCRUDRuntimeContext(
      "Parent",
      schema,
      db,
      parentPubSubContext
    )
  }
}
