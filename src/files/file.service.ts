import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FileEntity} from "../entities/file.entity";
import {Repository} from "typeorm";

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private fileRepository: Repository<FileEntity>
    ) {
    }
   findAllPhoto() {
        return this.fileRepository.find()
   }
}