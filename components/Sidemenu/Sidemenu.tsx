import React, { FC } from "react";
import './Sidemenu.scss';
import { NavigationData } from 'pages/_app';
import { useRouter } from 'next/router';
import Link from "next/link";


export const Sidemenu: FC<NavigationData> = ({ navData }) => {
  const { query: { navigation = "", sidemenu = "", dropdown = "", item = "" } } = useRouter();
  const currentSidemenu = navigation && navData.find(({ href }) => navigation === href).sidemenu;

  return (
    <nav className="sidemenu">
      {
        currentSidemenu && currentSidemenu.map(({ id, name, description, icon, href, dropdown: dropdownArray }) => {
          return (
            <div key={id} className="sidemenu__item">
              <Link key={id} href={`/index?navigation=${navigation}&sidemenu=${href}`} as={`/${navigation}/${href}`}>
                <a className={`sidemenu__link${sidemenu === href ? ' active' : ''}`}>
                  {React.createElement(require('react-icons/io')[icon], { className: "sidemenu__icon" })}
                  <span className="sidemenu__text">{name}</span>
                </a>
              </Link>
              {
                sidemenu === href && dropdownArray && dropdownArray.map(({ id, name, description, href, item: itemArray }) => {
                  return (
                    <ul key={id} className="dropdown ">
                      <li className="dropdown__item">
                        <Link href={`/index?navigation=${navigation}&sidemenu=${sidemenu}&dropdown=${href}`} as={`/${navigation}/${sidemenu}/${href}`}>
                          <a className={`dropdown__link${dropdown === href ? ' active' : ''}`}>
                            <span className="dropdown__text">{name}</span>
                          </a>
                        </Link>
                        <ul className={`dropdown__list${dropdown === href ? ' active' : ''}`}>
                          {
                            dropdown === href && itemArray && itemArray.map(({ id, href, name, description }) => {
                              return (
                                <li key={id} className="dropdown__list__item">
                                  <Link href={`/index?navigation=${navigation}&sidemenu=${sidemenu}&dropdown=${dropdown}&item=${href}`} as={`/${navigation}/${sidemenu}/${dropdown}/${href}`}>
                                    <a className="dropdown__list__link">
                                      <span className="dropdown__list__text">Examples</span>
                                    </a>
                                  </Link>
                                </li>
                              );
                            })
                          }
                        </ul>
                      </li>
                    </ul>
                  );
                })
              }
            </div>
          );
        })
      }

    </nav>
  );
};