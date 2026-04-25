import { Entity ,PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Farmer {
    @PrimaryGeneratedColumn({name: 'FARMER_ID'})
    farmerId!: number;

    @Column({name: 'FIRST_NAME', length: 255, nullable: false})
    firstName!: string;

    @Column({name: 'LAST_NAME', length: 255, nullable: false})
    lastName!: string;

    @Column({name: 'EMAIL', length: 255, unique: true})
    email!: string;

    @Column({name: 'PHONE_NUMBER', length: 20, nullable: true})
    phoneNumber!: string;

    @Column({name: 'FARM_NAME', length: 255, nullable: true})
    farmName!: string;

    @Column({name: 'PASSWORD_HASH', length: 255, nullable: false})
    passwordHash!: string;

    @Column({name: 'IS_ACTIVE', default: 1, nullable: false})
    isActive!: number;

    @Column({name: 'ROLE', length: 50, default: 'farmer', nullable: false})
    role!: string;

    @Column({name: 'CREATED_AT', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: Date;

    @Column({name: 'UPDATED_AT', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt!: Date;
}   
