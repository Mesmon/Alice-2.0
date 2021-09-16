import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

const name = "Michael Berezovsky"
export const siteTitle = "Next.js Sample Website"

export default function Layout({
    children,
    home,
}: {
    children: React.ReactNode
    home?: boolean
}) {
    return (
        <div className='max-w-2xl mt-12 mx-auto mb-24 py-0 px-4'>
            <Head>
                <link rel='icon' href='/favicon.ico' />
                <meta
                    name='description'
                    content='Learn how to build a personal website using Next.js'
                />
                <meta
                    property='og:image'
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name='og:title' content={siteTitle} />
                <meta name='twitter:card' content='summary_large_image' />
            </Head>
            <header className='flex flex-col items-center'>
                {home ? (
                    <div className='bg-white shadow-lg rounded m-8 p-8  flex md:bg-yellow-500'>
                        <div className='w-1/3 hidden sm:block'>
                            <Image
                                className='rounded-full'
                                priority
                                src='/images/profile.jpg'
                                height={140}
                                width={140}
                                alt={name}
                            />
                        </div>
                        <div className='sm:w-2/3 '>
                            <h3 className='text-yellow-600 text-xl font-semibold md:text-white'>
                                {name}
                            </h3>

                            <p className='text-gray-800 font-thin text-sm leading-normal md:text-white'>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Voluptatibus quia, nulla!
                                Maiores et perferendis eaque, exercitationem
                                praesentium nihil. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Voluptatibus quia,
                                nulla! Maiores et perferendis eaque,
                                exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link href='/'>
                            <a>
                                <Image
                                    priority
                                    src='/images/profile.jpg'
                                    className='rounded-full'
                                    height={108}
                                    width={108}
                                    alt={name}
                                />
                            </a>
                        </Link>
                        <h2 className='text-header-1xl font-extrabold my-4'>
                            <Link href='/'>
                                <a>{name}</a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className='mt-12'>
                    <Link href='/'>
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
}
