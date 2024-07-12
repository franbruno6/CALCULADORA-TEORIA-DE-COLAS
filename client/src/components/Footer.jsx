import { Footer } from "flowbite-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function FooterCom() {
    return (
        <Footer container className="border border-t-8 border-teal-500 mt-3">
            <div className='w-full max-w-7xl mx-auto'> 
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href='https://www.github.com/franbruno6' by='Francisco Bruno' year={new Date().getFullYear()}/>
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href='https://www.github.com/franbruno6' target="_blank" icon={BsGithub} />
                        <Footer.Icon href='https://www.linkedin.com/in/franbruno6/' target="_blank" icon={BsLinkedin} />
                    </div>
                </div>
            </div>
        </Footer>
    )
}
