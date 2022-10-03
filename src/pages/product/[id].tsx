import axios from 'axios';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Stripe from 'stripe';
import { stripe } from '../../lib/stripe';

import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product';

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
        defaultPrice: string;
    };
}

export default function Product({ product }: ProductProps) {
    const [loading, setLoading] = useState(false);
    const { isFallback } = useRouter();

    if (isFallback) {
        return <p>Loading...</p>;
    }

    async function handleBuyProduct() {
        try {
            setLoading(true);
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPrice,
            });

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;
        } catch (error) {
            //conectar com alguma ferramente de observabilidade (DataDog / Sentry)
            setLoading(false);
            alert('Falha ao redirecionar para o checkout');
        }
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>
                <button disabled={loading} onClick={handleBuyProduct}>
                    Comprar Agora
                </button>
            </ProductDetails>
        </ProductContainer>
    );
}
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: { id: 'prod_MW5fHgEP1mtEfp' },
            },
        ],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    });
    const price = product.default_price as Stripe.Price;

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount / 100),
                description: product.description,
                defaultPrice: price.id,
            },
        },
        // revalidate: 60 * 60 * 1,
    };
};
