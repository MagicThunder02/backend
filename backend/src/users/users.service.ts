import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from 'src/database/dto/user.dto';
import { User, UserDocument } from 'src/database/schemas/user.schema';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async createUser(userDto: UserDto): Promise<User> {
    const CreatedUser = new this.userModel(userDto);
    return await CreatedUser.save();
  }

  async updateUser(userDto: UserDto): Promise<any> {
    return this.userModel.findOneAndUpdate({ _id: userDto._id }, userDto, { returnDocument: "after" }).exec();
  }

  async deleteUser(body): Promise<any> {
    return this.userModel.deleteMany(body).exec();
  }


  async findByEmail(email): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }


}
