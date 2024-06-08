import {
    Controller,
    Get, MaxFileSizeValidator, ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FileService} from "./file.service";
import {FileInterceptor} from "@nestjs/platform-express";
import e from "express";
import {diskStorage} from "multer";

@Controller('files')
@ApiBearerAuth()
@ApiTags('file')
export class FileController {
    constructor(private readonly fileService: FileService) {
    }
    
    @Get()
    getAll() {
        return this.fileService.findAllPhoto()
    }
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: 'upload/images',
                filename(
                    req: e.Request,
                    file: Express.Multer.File,
                    callback: (error: Error | null, filename: string) => void,
                ) {
                    callback(null, Date.now() + file.originalname);
                },
            }),
        }),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                comment: { type: 'string' },
                outletId: { type: 'integer' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    uploadFile2(@UploadedFile(
        new ParseFilePipe({
            validators:[new MaxFileSizeValidator({maxSize: 1024 * 1024 * 5 })]
        })
    ) file: Express.Multer.File) {
        return file
    }
    

}