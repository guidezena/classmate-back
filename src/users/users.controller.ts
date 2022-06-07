import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { AuthenticationService } from '../authentication/authentication.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authenticationService: AuthenticationService,
  ) {}

  @Post('/login')
  login(@Req() req): any {
    return this.authenticationService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  createUser(@Req() req): any {
    return this.userService.createUser(req.body, req.user.type);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  listUsers(@Req() req): any {
    return this.userService.getUsers(req.user.type);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/admin/themes')
  getAdminThemes(@Req() req): any {
    return this.userService.findAdminThemes(req.user.type);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/themes')
  addTheme(@Req() req): any {
    return this.userService.addTheme(req.body, req.user.type);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/admin/themes/:id')
  getTheme(@Req() req): any {
    return this.userService.findThemeById(req.params.id, req.user.type);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/admin/themes/:id')
  deleteTheme(@Req() req): any {
    return this.userService.deleteThemeById(req.params.id, req.user.type);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/admin/themes/:id')
  updateTheme(@Req() req): any {
    return this.userService.updateThemeById(
      req.params.id,
      req.user.type,
      req.body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/admin/hours')
  getAdminHours(@Req() req): any {
    return this.userService.findAdminHours(req.user.type);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/admin/hours')
  createAdminHours(@Req() req): any {
    return this.userService.addHour(req.body, req.user.type);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/admin/hours/:id')
  deleteHour(@Req() req): any {
    return this.userService.deleteHourById(req.params.id, req.user.type);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/admin/hours/:id')
  updateHour(@Req() req): any {
    return this.userService.updateHourById(
      req.params.id,
      req.user.type,
      req.body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/admin/hours/:id')
  getHour(@Req() req): any {
    return this.userService.findHourById(req.params.id, req.user.type);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/themes')
  getThemesUser(@Req() req): any {
    return this.userService.findThemes(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/hours')
  getHoursUser(@Req() req): any {
    return this.userService.findHours(req.user.userId);
  }
}
