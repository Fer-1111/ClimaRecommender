import { Controller, Post, Body, Res, Req, Get, HttpCode } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller()
export class AuthController {
  @Post('login')
  @HttpCode(200)
  login(@Body() body: any, @Res() res: Response) {
    const { username, password } = body;

    // Simulación de autenticación
    if (username === 'admin' && password === '1234') {
      res.cookie('user', username, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // cambiar a true si usas HTTPS en producción
      });
      return res.send({ success: true });
    }

    return res.status(401).send({ success: false, message: 'Credenciales incorrectas' });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('user');
    res.send({ success: true });
  }

  @Get('session')
  getSession(@Req() req: Request) {
    const user = req.cookies?.user;
    return { user: user || null };
  }
}
