import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, UpdateAuthDto, LoginDto, RegisterUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcryptjs from 'bcryptjs';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) 
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // console.log (createUserDto);
    // const newUser = new this.userModel(createUserDto);
    // return newUser.save();
    //TODO
    //1.- Encriptar la contraseña

    //2.- Guardar el usuario

    //3.- Generar JSON WebToken
    try {
      //const newUser = new this.userModel(createUserDto);

      // en lugar de la línea de arriba, vamos a desestructurar
      // la contraseña por un lado, y el resto de campos del DTO
      // en otra variable, userData, mediante el operador spread      
      const { password, ...userData} = createUserDto;
      const newUser = new this.userModel(
        {
          password: bcryptjs.hashSync(password, 10),
          ...userData
        }
      );

      await newUser.save();
      // como no queremos que ni el usuario vea la contraseña, hacemos una modificación
      const { password:_, ...user } = newUser.toJSON();
      return user;
    } catch (error) {
      if (error.code === 11000){ //código para clave duplicada
        throw new BadRequestException(`${createUserDto.email} already exist`);
      }
      throw new InternalServerErrorException('PANIC!!! We don´t know what the hell has happened');
    }
  }

  async login( loginDto: LoginDto): Promise<LoginResponse> {
    /**
     * Debe devolver:
     * User {_id, name, email. roles,}
     * Token -> debe ser un JsonWeb Token
     */
    const { email, password} = loginDto;
    const user = await this.userModel.findOne({ email: email}); //encuentra uno donde el email sea igual al que se recibe
    if (!user){
      throw new UnauthorizedException ('Not valid credentials - email');
    }

    if (!bcryptjs.compareSync (password, user.password)) {
      throw new UnauthorizedException ('Not valid credentials - wrong password');
    }
    
    const { password:_, ...rest} = user.toJSON();
    return {
     user:   rest,
     token: this.getJwtToken({ id: user.id }),
    }
   //return 'Login OK';
  }

  async register( registerUserDto: RegisterUserDto): Promise<LoginResponse>{
    const user = await this.create( registerUserDto); //podemos mandarle un registerUserDto porque son prácticamente iguales, de lo contrario habría que desestructurar
    return {
      user: user,
      token: this.getJwtToken({ id: user._id })
    }
  }

  findAll(): Promise<User[]>{
    return this.userModel.find();
  }

  async findUserById( userId: string) {
    const user = await this.userModel.findById ( userId );
    const { password, ...rest } = user.toJSON();
    return rest;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken( payload: JwtPayload ): string{
    const token = this.jwtService.sign(payload);
    return token;
  }
}
