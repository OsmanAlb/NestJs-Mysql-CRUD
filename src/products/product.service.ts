import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { pool } from '../database.service'; // Adjust the import according to your directory structure
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class ProductsService {
    async getAllProducts(): Promise<RowDataPacket[]> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT `id`, `name` FROM `products`");
        return rows;
    }

    async getProductById(id: number): Promise<RowDataPacket> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT `id`, `name` FROM `products` WHERE `id` = ?", [id]);
        return rows[0];
    }

    async addProduct(data: { name: string, price: number, category_id: number, description: string }): Promise<OkPacket> {
        const { name, price, category_id, description } = data;
        const [result] = await pool.query<OkPacket>(
            "INSERT INTO `products` (`name`, `price`, `category_id`, `description`) VALUES (?, ?, ?, ?)",
            [name, price, category_id, description]
        );
        return result;
    }

    async updateProduct(id: number, data: { name: string, price: number, category_id: number, description: string }): Promise<OkPacket> {
        const { name, price, category_id, description } = data;
        const [result] = await pool.query<OkPacket>(
            "UPDATE `products` SET `name` = ?, `price` = ?, `category_id` = ?, `description` = ? WHERE `id` = ?",
            [name, price, category_id, description, id]
        );
        return result;
    }

    async deleteProduct(id: number): Promise<OkPacket> {
        const [result] = await pool.query<OkPacket>("DELETE FROM `products` WHERE `id` = ?", [id]);
        return result;
    }
}