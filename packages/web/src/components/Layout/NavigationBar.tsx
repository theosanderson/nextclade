import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { connect } from 'react-redux'
import { FaDocker, FaGithub, FaHome, FaNpm, FaTable, FaTree, FaTwitter } from 'react-icons/fa'
import { Nav, NavItem } from 'reactstrap'
import { TreeIcon } from 'src/components/Tree/TreeIcon'

import { WhatsNewButton } from 'src/components/WhatsNew/WhatsNewButton'

import { State } from 'src/state/reducer'
import { selectPathname } from 'src/state/router/router.selectors'

import { Link } from 'src/components/Link/Link'
import { LinkExternal } from 'src/components/Link/LinkExternal'

import { ReactComponent as BrandLogo } from 'src/assets/img/nextstrain_logo.svg'

import { LanguageSwitcher } from './LanguageSwitcher'
import { NavigationLogo } from './NavigationLogo'
import { NavigationLink } from './NavigationLink'

export interface NavigationBarProps {
  pathname: string
}

const mapStateToProps = (state: State) => ({
  pathname: selectPathname(state),
})

const mapDispatchToProps = {}

export const NavigationBar = connect(mapStateToProps, mapDispatchToProps)(NavigationBarDisconnected)

export function NavigationBarDisconnected({ pathname }: NavigationBarProps) {
  const { t } = useTranslation()

  const navLinksLeft = useMemo(
    () => [
      {
        title: t('Home'),
        url: '/',
        alt: t('Go to home page'),
        icon: <FaHome size={20} color="#aaa" />,
      },
      {
        title: t('Results'),
        url: '/results',
        alt: t('Go to results page'),
        icon: <FaTable size={20} color="#aaa" />,
      },
      {
        title: t('Tree'),
        url: '/tree',
        alt: t('Go to tree page'),
        icon: <TreeIcon />,
      },
    ],
    [t],
  )

  const navLinksRight = useMemo(
    () => [
      {
        title: t('Twitter'),
        url: 'https://twitter.com/nextstrain',
        alt: t('Link to our Twitter'),
        icon: <FaTwitter size={28} color="#aaa" />,
      },
      {
        title: t('Our NPM packages'),
        url: 'https://www.npmjs.com/package/@neherlab/nextclade',
        alt: t('Link to our NPM package'),
        icon: <FaNpm size={28} color="#aaa" />,
      },
      {
        title: t('Our containers at Docker Hub'),
        url: 'https://hub.docker.com/r/neherlab/nextclade',
        alt: t('Link to our Docker containers'),
        icon: <FaDocker size={28} color="#aaa" />,
      },
      {
        title: t('GitHub'),
        url: 'https://github.com/nextstrain/nextclade',
        alt: t('Link to our Github page'),
        icon: <FaGithub size={28} color="#aaa" />,
      },
    ],
    [t],
  )

  return (
    <nav
      className="navbar navbar-expand navbar-light navbar-scroll hide-native-scrollbar"
      role="navigation"
      data-testid="NavigationBar"
    >
      <Link className="navbar-brand d-flex" href="/" role="button">
        <BrandLogo className="navigation-bar-product-logo" />
        <NavigationLogo />
      </Link>

      <ul className="navbar-nav mr-auto d-flex">
        {navLinksLeft.map(({ title, url, alt, icon }) => (
          <NavigationLink key={url} url={url} alt={alt}>
            <span>{icon}</span>
            <span>{title}</span>
          </NavigationLink>
        ))}
      </ul>

      <ul className="navbar-nav ml-auto d-flex">
        <li className="nav-item mx-2 my-auto">
          <LanguageSwitcher />
        </li>

        {navLinksRight.map(({ title, url, alt, icon }) => (
          <li key={title} className="nav-item mx-2 my-auto">
            <LinkExternal title={title} url={url} alt={alt}>
              {icon}
            </LinkExternal>
          </li>
        ))}
      </ul>
    </nav>
  )
}
