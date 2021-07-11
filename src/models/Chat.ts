import { prop, getModelForClass } from '@typegoose/typegoose'

export class Chat {
  @prop({ required: true, index: true, unique: true })
  telid: number

  @prop({ required: true, default: 'en' })
  language: string
}

// Get Chat model
const ChatModel = getModelForClass(Chat, {
  schemaOptions: { timestamps: true },
})

// Get or create chat
export async function findChat(telid: number) {
  let chat = await ChatModel.findOne({ telid })
  if (!chat) {
    // Try/catch is used to avoid race conditions
    try {
      chat = await new ChatModel({ telid }).save()
    } catch (err) {
      chat = await ChatModel.findOne({ telid })
    }
  }
  return chat
}
