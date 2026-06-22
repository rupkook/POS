import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import HeaderBang from '../component/HeaderBang';
import FooterBang from '../component/FooterBang';
import SEO from '../component/SEO';

export default function ThankYouBang() {
    return (
        <>
            <SEO 
                title="ধন্যবাদ" 
                description="Markt POS এর সাথে যোগাযোগ করার জন্য ধন্যবাদ। আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করব।" 
            />
            <HeaderBang />
            <div className="min-h-[70vh] flex items-center justify-center bg-[var(--bg-color)] px-4 mt-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[var(--border-color)]"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-[#E8FAAA] rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle size={40} className="text-[var(--primary-color)]" />
                    </motion.div>
                    <h1 className="text-3xl font-extrabold text-[var(--primary-color)] mb-4 tracking-tight">ধন্যবাদ!</h1>
                    <p className="text-[var(--text-secondary)] text-base font-medium mb-8 leading-relaxed">
                        আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে। আমাদের প্রতিনিধি খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                    </p>
                    <Link 
                        to="/bn"
                        className="inline-flex items-center justify-center w-full py-4 px-6 bg-[var(--primary-color)] text-white rounded-xl font-bold text-[15px] hover:bg-[var(--primary-light)] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </motion.div>
            </div>
            <FooterBang />
        </>
    );
}
