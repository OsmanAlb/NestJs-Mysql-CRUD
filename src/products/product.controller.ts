import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getAllProducts() {
        return await this.productsService.getAllProducts();
    }

    @Get(':id')
    async getProductById(@Param('id') id: number) {
        return await this.productsService.getProductById(id);
    }

    @Post()
    async addProduct(@Body() data: { name: string, price: number, category_id: number, description: string }) {
        return await this.productsService.addProduct(data);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: number, @Body() data: { name: string, price: number, category_id: number, description: string }) {
        return await this.productsService.updateProduct(id, data);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: number) {
        return await this.productsService.deleteProduct(id);
    }
}