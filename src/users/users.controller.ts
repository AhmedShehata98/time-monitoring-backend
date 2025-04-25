import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User as UserDecorator } from '../common/decorators/user.decorator'
import { User } from './entities/user.entity'
import { Roles } from 'src/common/decorators/roles.decorator'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { CompanyRole } from 'src/company_employees/enums/company-role.enum'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/me')
  getProfile(
    @UserDecorator('userId') userId: string,
  ): Promise<Omit<User, 'passwordHash'>> {
    return this.usersService.getProfile(userId)
  }

  @UseGuards(RolesGuard)
  @Roles(CompanyRole.ADMIN, CompanyRole.OWNER)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(CompanyRole.ADMIN, CompanyRole.OWNER)
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    // @Param('id') id: string, // Keep Param('id') if admins can update others
    @UserDecorator('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
