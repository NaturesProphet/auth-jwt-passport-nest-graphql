import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './DTOs/login.dto';



@Controller( 'auth' )
export class AuthController {
  constructor( private readonly authService: AuthService ) { }


  @UseGuards( AuthGuard( 'local' ) )
  @Post( 'admin' )
  async login ( @Request() req, @Body() dto: LoginDto ) {
    return this.authService.login( req.user );
  }


  @UseGuards( AuthGuard( 'jwt' ) )
  @Get( 'profile' )
  getProfile ( @Request() req ) {
    return req.user;
  }
}
