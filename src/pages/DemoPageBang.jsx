import HeaderTopBang from '../component/HeaderTopBang';
import HeaderBang from '../component/HeaderBang';
import FooterBang from '../component/FooterBang';
import DemoFormBang from '../component/DemoFormBang';
import { motion } from 'framer-motion';

export default function DemoPageBang() {
    return (
        <motion.div 
            className="bg-[var(--bg-color)] min-h-screen flex flex-col font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <HeaderTopBang />
            <HeaderBang />

            <main className="flex-grow py-10 sm:py-16 lg:py-20">
                <DemoFormBang />
            </main>

            <FooterBang />
        </motion.div>
    );
}