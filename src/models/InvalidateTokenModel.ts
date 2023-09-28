import mongoose,{Schema} from "mongoose";
import { InvalidateTokenType } from "../types/UserTypes";


  const invalidTokenSchema = new Schema({
    invalidatedTokens: [
      {
        type: String,
        required: true,
      },
    ],
  });

  export const InvalidateToken = mongoose.model<InvalidateTokenType>(
    'InvalidToken',
    invalidTokenSchema
  );