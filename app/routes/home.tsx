import { prisma } from '~/db.server';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'New React Router App' },
        { name: 'description', content: 'Welcome to React Router!' }
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const users = await prisma.user.findMany();

    return {
        users
    };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <pre>
                <code>{JSON.stringify(loaderData, null, 4)}</code>
            </pre>
        </>
    );
}
