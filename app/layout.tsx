import "@/styles/globals.scss";

export const metadata = {
    title: "Prodback",
    description: "Product feedback frontend mentor challenge",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
