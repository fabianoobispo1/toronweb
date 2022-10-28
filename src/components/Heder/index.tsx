
import { SignInButton } from '../SignInButton';


import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';

export function Header() {
 

    return (
        <header 
        //className={styles.headerContainer}
        className="border-solid border-b" 
        >
            <div className={styles.headerContent}>
              
                <nav>   
                    <ActiveLink activeClassName={styles.active } href='/dashboard'>
                        <a>Dashboard</a>
                    </ActiveLink>
                    <ActiveLink  activeClassName={styles.active } href='/cadastros'> 
                        <a>Cadastros</a>
                    </ActiveLink>
                    
              
                </nav>
                <SignInButton/>
            </div>
        </header>
        
    );
}