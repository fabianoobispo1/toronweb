
//import { SignInButton } from '../SignInButton';


import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';

export function Header() {
 

    return (
        <header 
        //className={styles.headerContainer}
        className="border-solid border-b" 
        >
            <div className={styles.headerContent}>
               {/*  <img src="/images/logo1.svg" alt="Logo1" /> */}
                <nav>   
                    <ActiveLink activeClassName={styles.active } href='/dashboard'>
                        <a>Início</a>
                    </ActiveLink>
                    <ActiveLink  activeClassName={styles.active } href='/dashboard'> 
                        <a>Testes</a>
                    </ActiveLink>
                    <ActiveLink  activeClassName={styles.active } href='/dashboard'> 
                        <a>Sobre</a>
                    </ActiveLink>                     
                    
                   
                </nav>
                {/* <SignInButton/> */}
            </div>
        </header>
    );
}