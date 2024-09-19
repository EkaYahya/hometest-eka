import {MockHandler} from "vite-plugin-mock-server";
import { faker } from '@faker-js/faker';

function generateItems() {
    const items = [];
    const categories = ["Electronics", "Clothing", "Books", "Toys", "Home"];
    for (let i = 0; i < 100; i++) {
        items.push({
            id: i + 1,
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
            image: faker.image.url(),
            category: categories[Math.floor(Math.random() * categories.length)],
        });
    }
    return items;
}

const items = generateItems();

export default (): MockHandler[] => [
    {
        pattern: "/api/items",
        method: "GET",
        handle: (_, res) => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(items));
        },
    }
]
