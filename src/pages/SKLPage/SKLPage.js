import React from 'react';
import {useSelector} from "react-redux";

import css from './SKLPage.module.css';
import coin from '../../images/coin.svg'
import {PresentForUserAlways} from "../../components";
import banner__angle from "../../images/banner-angle.svg";
import css_helper from './../../components/ForHomePage/SKLBanner/SKLBanner.module.css'
import rootCSS from '../../styles/root.module.css';
import {useNavigate} from "react-router-dom";


const SklPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const navigate = useNavigate();

    const home = () => {
        return navigate('/')
    }

    return (
        <div className={css.skl__container}>
            <div className={css.skl__bg}></div>
            <div className={css.skl__block}>

                <div className={css.skl__header}>
                    <div className={css.skl__token}>
                        <div className={css_helper.banner__box}>
                            <div className={css_helper.banner__content}>
                                {EN ?
                                    <div className={css_helper.banner__text}>
                                        Pass the <span className={css.banner__underline}>tests</span> successfully and
                                        get <span
                                        className={css.banner__underline}>SKL</span> token from
                                        <span className={css_helper.banner__name}> Skilliant</span>
                                    </div>
                                    :
                                    <div className={css_helper.banner__text}>
                                        Проходиш успішно <span
                                        className={css.banner__underline}>тести</span> отримуй <span
                                        className={css.banner__underline}>SKL</span> токен
                                        від <span className={css_helper.banner__name}>Skilliant</span>
                                    </div>
                                }
                            </div>
                            <img src={banner__angle} alt="banner__angle" className={css_helper.banner__angle}/>
                        </div>
                    </div>
                </div>

                <div className={css.what_it_is}>
                    <>
                        {EN ? <span className={css.skl__instruction__block__title}>What is SKL?</span> :
                            <span className={css.skl__instruction__block__title}>Що таке SKL?</span>}
                    </>
                    <>
                        {
                            EN ?
                                <div className={css.skl__instruction__block__content}>
                                        <span className={css.text__start}><img src={coin} alt="coin"
                                                                               className={css.coin}/>SKL</span> — is its
                                    own <span className={css.banner__name__span}>SKILLIANT</span> token on the main
                                    network of the Polygon blockchain with the native token of the Polygon
                                    network -
                                    MATIC.
                                    The token has entered the stock exchange and is traded in open access for
                                    all
                                    interested parties.
                                    <br/>You can learn more about the token and see all transactions here:
                                    <a
                                        href="https://polygonscan.com/token/0x1d68dfc73e9ca737c12a8fc599251906358fe090"
                                        className={css.skl__link}
                                        target="_blank"
                                    > www.polygonscan.com/token/skl</a>
                                </div> :
                                <div className={css.skl__instruction__block__content}>
                                        <span className={css.text__start}><img src={coin} alt="coin"
                                                                               className={css.coin}/>SKL</span> — це
                                    власний <span className={css.banner__name__span}>SKILLIANT</span> токен на
                                    головній мережі блокчейну Polygon з нативним токеном мережі Polygon - MATIC.
                                    Токен вийшов на біржу і торгується у відкритому доступі для всіх охочих.
                                    <br/>Більш детально ознайомитись з токеном та побачити всі трансакції ви
                                    можете
                                    тут: <a
                                    href="https://polygonscan.com/token/0x1d68dfc73e9ca737c12a8fc599251906358fe090"
                                    className={css.skl__link}
                                >www.polygonscan.com/token/skl</a>

                                </div>
                        }
                    </>
                </div>

                <div className={css.skl_present}>
                    <PresentForUserAlways/>
                </div>

                <div className={css.skl__instruction}>
                    <div className={css.skl__instruction__block}>
                        <div>
                            <div className={css.polygon}></div>
                            <>
                                {EN ? <span
                                        className={css.skl__instruction__block__title}>What is Polygon (MATIC)?</span> :
                                    <span
                                        className={css.skl__instruction__block__title}>Що таке Polygon (MATIC)?</span>}
                            </>
                            <>
                                {
                                    EN ?
                                        <div className={css.skl__instruction__block__content}>
                                            <span className={css.text__start}>Polygon (MATIC)</span> — is a
                                            cryptocurrency, with the symbol MATIC, and also a
                                            technology platform that enables blockchain networks to connect and scale.
                                            Polygon launched under the name Matic Network in 2017 and uses a modified
                                            proof-of-stake consensus mechanism to operate the platform. MATIC is an
                                            ERC-20 token, meaning that it's compatible with other Ethereum-based digital
                                            currencies. MATIC is used to govern and secure the Polygon network and to
                                            pay network transaction fees.

                                        </div> :
                                        <div className={css.skl__instruction__block__content}>
                                            <span className={css.text__start}>Polygon (MATIC)</span> — це криптовалюта з
                                            символом MATIC, а також технологічна
                                            платформа, яка дозволяє мережам блокчейнів підключатися та масштабуватися.
                                            Polygon був запущений під назвою Matic Network у 2017 році та використовує
                                            модифікований консенсусний механізм підтвердження частки для роботи
                                            платформи. MATIC — це токен ERC-20, що означає, що він сумісний з іншими
                                            цифровими валютами на основі Ethereum. MATIC використовується для управління
                                            мережею Polygon і її безпеки, а також для сплати комісії за мережеві
                                            транзакції.
                                        </div>
                                }
                            </>
                        </div>

                        <div>
                            <div className={css.person}></div>
                            <>
                                {EN ? <span
                                        className={css.skl__instruction__block__title}>What is SKL for?</span> :
                                    <span
                                        className={css.skl__instruction__block__title}>Для чого SKL?</span>}
                            </>
                            <>
                                {
                                    EN ?
                                        <div className={css.skl__instruction__block__content}>
                                            <span className={css.text__start}>Improve</span> yourself
                                            and level up your skills and in return
                                            <span className={css.banner__name__span}> SKILLIANT </span>
                                            will pay you for it.
                                            <br/><span className={css.banner__name__span}> SKILLIANT </span> has many
                                            monetized tests, by passing which you have the
                                            opportunity to receive a settlement in cryptocurrency.
                                            <br/><span className={css.text__start}>Everything</span> is very
                                            simple: Upon successful execution, you are credited with coins, the amount
                                            of which is displayed on your personal page. Next, apply for cryptocurrency
                                            and wait for the wallet to be replenished.

                                        </div> :
                                        <div className={css.skl__instruction__block__content}>
                                            <span className={css.text__start}>Удосконалюйте </span>
                                            свої навички та прокачуйте свої скіли і у відповідь
                                            <span className={css.banner__name__span}> SKILLIANT </span>
                                            буде платити вам за ваші навички.
                                            <br/><span className={css.banner__name__span}> SKILLIANT </span> має безліч
                                            монетизованих тестів, при проходжені яких ви маєте
                                            можливість отримати розрахунок криптовалютою. <br/><span
                                            className={css.text__start}>Все дуже просто</span>: При успішному
                                            виконанні вам нараховуються монетки, кількість яких відображаються на
                                            персональній сторінці. Далі подавайте заявку на отримання криптовалюти і
                                            очікуйте поповненя на гаманці.
                                        </div>
                                }
                            </>
                        </div>

                        <div>
                            <div className={css.steps}></div>
                            <>
                                {EN ? <span
                                        className={css.skl__instruction__block__title}>How to get SKL?</span> :
                                    <span
                                        className={css.skl__instruction__block__title}>Як отримати SKL?</span>}
                            </>
                            <>
                                {
                                    EN ?
                                        <div className={css.skl__instruction__block__content}>
                                            <span className={css.text__start}>To</span> receive an SKL token, fulfill
                                            the following mandatory conditions:
                                            <br/><h1></h1>
                                            <br/><span className={css.text__start}>1) To</span> get started, you need to
                                            have your own wallet on the Polygon
                                            blockchain network.
                                            <br/>To do this, you can use the
                                            MetaMask web wallet or the Matic web wallet
                                            created by the Polygon team. Instructions for using the MetaMask web wallet
                                            are described in detail at the link:
                                            <br/><a href="https://academy.binance.com/uk/articles/how-to-use-metamask"
                                                    className={css.skl__link}
                                                    target="_blank"
                                        >www.academy.binance.com/uk/articles/how-to-use-metamask</a>
                                            <br/><h1></h1>
                                            <br/><span className={css.text__start}>2) Successfully</span> pass monetized
                                            tests on <span className={css.banner__name__span}>SKILLIANT</span>.
                                            <br/>All monetized tests are marked with a coin <img src={coin} alt="coin"
                                                                                                 className={css.coin}/>.
                                            Each such test has its own threshold for receiving a coin, so you need to
                                            successfully pass such a threshold.
                                            <span className={css.banner__name__span}> SKILLIANT </span> will definitely
                                            inform you about the coin accrual.
                                            <br/><h1></h1>
                                            <br/><span className={css.text__start}>3) Apply</span> for SKL token and
                                            wait for successful enrollment.

                                            <br/>Following these few simple steps will allow
                                            you to improve your skills and earn monetized tests from
                                            <span className={css.banner__name__span}> SKILLIANT</span>.
                                        </div> :
                                        <div className={css.skl__instruction__block__content}>
                                            <span className={css.text__start}>Для</span> отримання токену SKL виконайте
                                            наступні обов'язкові етапи:
                                            <br/><h1></h1>
                                            <br/><span className={css.text__start}>1) Для</span> початку вам потрібно
                                            мати власний гаманець у мережі блокчейну Polygon.
                                            <br/>Для цього ви можете використовувати веб-гаманець MetaMask або
                                            веб-гаманець
                                            Matic, створений командою Polygon. Інструкція використання веб-гаманця
                                            MetaMask детально опсисана за посиланням -
                                            <br/><a href="https://academy.binance.com/uk/articles/how-to-use-metamask"
                                                    className={css.skl__link}
                                                    target="_blank"
                                        >www.academy.binance.com/uk/articles/how-to-use-metamask</a>
                                            <br/><h1></h1>
                                            <br/><span className={css.text__start}>2) Успішно</span> проходити
                                            монетизовані тести на <span
                                            className={css.banner__name__span}>SKILLIANT</span>.
                                            <br/>Усі монетизовані тести маркуються монеткою <img src={coin} alt="coin"
                                                                                                 className={css.coin}/>.
                                            У кожному такому тесті є свій поріг отримання монетки, тому вам потрібно
                                            успішно
                                            пройти такий поріг. <span
                                            className={css.banner__name__span}>SKILLIANT</span> вам обов'язково
                                            повідомить про нарахування монетки.
                                            <br/><h1></h1>
                                            <br/><span className={css.text__start}>3) Подавайте</span> заявку на
                                            отримання токену SKL так очікуйте успішного
                                            зарахування
                                            <br/>Виконання цих декількох простих
                                            кроків дозволить вам удосконалювати свої скіли та заробляти на монетизованих
                                            тестах від <span className={css.banner__name__span}>SKILLIANT</span>.
                                        </div>
                                }
                            </>
                        </div>
                    </div>

                    <>
                        {
                            EN ? <div className={css.skl__instruction__block__content}>
                                <span
                                    className={css.banner__name__span}>SKILLIANT </span>wish you success and
                                    professional development!
                                </div> :
                                <div className={css.skl__instruction__block__content}>
                                    <span
                                        className={css.banner__name__span}>SKILLIANT</span> бажає вам успіхів та
                                    професійного розвитку!
                                </div>
                        }
                    </>
                </div>
                <div className={rootCSS.default__button} onClick={() => home()}>{EN ? "To main" : "На головну"}</div>
            </div>

        </div>
    );
};

export {SklPage};
