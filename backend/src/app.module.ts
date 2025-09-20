import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ContentModule } from './content/content.module';
// TODO: import other modules (SEO, publishing, analytics, integrations)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    ContentModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}