import { Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'ping', schema: 'public' })
export class Ping {
	@PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
	id: number;

	@CreateDateColumn({ type: 'timestamptz', name: 'created_at', default: () => 'now()' })
	created_at: Date;
}
