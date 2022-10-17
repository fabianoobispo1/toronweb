import styles from './styles.module.scss';
import { singout } from '../../contexts/AuthContext';

export function SignInButton() {
  
    async function handleButton() {
        singout()
    }
   return (
        <button className={styles.SignInButton} onClick={handleButton}>
            Sair
        </button>
   )
}

