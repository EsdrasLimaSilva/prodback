import "@/styles/globals.scss";
import ReduxProvider from "./redux/prodvider";

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
            <body>
                <link
                    rel="shortcut icon"
                    href="/icon.png"
                    type="image/x-icon"
                />
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
