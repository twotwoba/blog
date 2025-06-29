import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from 'public/static/images/logo.svg'
import Link from './Link'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
    return (
        <header className="flex items-center justify-between pb-8 pt-10">
            <div>
                <Link href="/" aria-label={siteMetadata.headerTitle}>
                    <div className="flex items-center justify-between">
                        <div className="mr-3">
                            <Logo />
                        </div>
                        {typeof siteMetadata.headerTitle === 'string' ? (
                            <div className="hidden h-6 text-2xl font-semibold sm:block">{siteMetadata.headerTitle}</div>
                        ) : (
                            siteMetadata.headerTitle
                        )}
                    </div>
                </Link>
            </div>
            <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
                {headerNavLinks
                    .filter((link) => link.href !== '/')
                    .map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400 sm:block">
                            {link.title}
                        </Link>
                    ))}
                <SearchButton />
                <ThemeSwitch />
            </div>
        </header>
    )
}

export default Header
