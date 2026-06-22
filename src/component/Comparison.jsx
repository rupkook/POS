import React from 'react';
import { motion } from 'framer-motion';

export default function Comparison() {
    const features = [
        { name: "Inventory tracking", icon: "fa-boxes-stacked" },
        { name: "Cloud-based system", icon: "fa-cloud" },
        { name: "Touch screen POS", icon: "fa-hand-pointer" },
        { name: "Offline mode", icon: "fa-wifi" },
        { name: "E-commerce integration", icon: "fa-cart-shopping" },
        { name: "Scale integration", icon: "fa-weight-scale" },
        { name: "Label printing", icon: "fa-print" },
        { name: "EBT/SNAP support", icon: "fa-credit-card" },
        { name: "24/7 support", icon: "fa-headset" },
    ];

    // true = has feature, false = doesn't
    const competitors = {
        markt: [true, true, true, true, true, true, true, true, true],
        square: [false, true, true, false, true, false, true, false, true],
        clover: [true, true, true, false, false, true, false, true, false],
    };

    const Check = () => (
        <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 text-green-600 shadow-sm">
            <i className="fa-solid fa-check text-xs"></i>
        </div>
    );

    const Cross = () => (
        <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-50 text-red-400">
            <i className="fa-solid fa-xmark text-xs"></i>
        </div>
    );

    return (
        <section className="py-16 sm:py-24 lg:py-32 overflow-hidden">
            <div className="main-container">
                {/* Header */}
                <motion.div className="text-center mb-12 sm:mb-16 lg:mb-20"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--secondary-color)]/10 text-[var(--secondary-color)] text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">
                        <i className="fa-solid fa-chart-bar"></i> Comparison
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--primary-color)] mb-3 sm:mb-4">
                        What's the best grocery POS?
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] max-w-xl mx-auto font-medium">
                        See how Markt POS stacks up against other popular solutions side by side.
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <motion.div className="main-container"
                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[580px]">
                                <thead>
                                    <tr className="border-b-2 border-gray-100">
                                        <th className="p-4 sm:p-6 text-left w-[34%] bg-gray-50/80">
                                            <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider">Features</span>
                                        </th>
                                        {/* MarktPOS - highlighted column */}
                                        <th className="p-4 sm:p-6 text-center w-[22%] relative" style={{ background: 'var(--bg-color)' }}>
                                            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-[80%] h-1 rounded-b-full bg-[var(--secondary-color)]"></div>
                                            <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                                                <span className="bg-[var(--secondary-color)] text-white text-[8px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                    <i className="fa-solid fa-crown mr-1 text-white"></i> Best Pick
                                                </span>
                                                <div className="font-extrabold text-base sm:text-xl text-[var(--primary-color)] flex items-center gap-1.5">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[var(--primary-color)] flex items-center justify-center">
                                                        <i className="fa-solid fa-store text-white text-[8px] sm:text-[10px]"></i>
                                                    </div>
                                                    MarktPOS
                                                </div>
                                                <div className="flex items-center gap-0.5 mt-0.5">
                                                    {[1, 2, 3, 4, 5].map(s => <i key={s} className="fa-solid fa-star text-yellow-400 text-[8px] sm:text-[10px]"></i>)}
                                                    <span className="text-[9px] sm:text-[11px] text-gray-500 ml-1 font-semibold">4.9</span>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="p-4 sm:p-6 text-center w-[22%] border-l border-gray-100">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <div className="font-bold text-sm sm:text-lg text-gray-400">Square</div>
                                                <div className="flex items-center gap-0.5">
                                                    {[1, 2, 3, 4].map(s => <i key={s} className="fa-solid fa-star text-gray-300 text-[8px] sm:text-[10px]"></i>)}
                                                    <i className="fa-regular fa-star text-gray-300 text-[8px] sm:text-[10px]"></i>
                                                    <span className="text-[9px] sm:text-[11px] text-gray-400 ml-1 font-semibold">4.2</span>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="p-4 sm:p-6 text-center w-[22%] border-l border-gray-100">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <div className="font-bold text-sm sm:text-lg text-gray-400">Clover</div>
                                                <div className="flex items-center gap-0.5">
                                                    {[1, 2, 3].map(s => <i key={s} className="fa-solid fa-star text-gray-300 text-[8px] sm:text-[10px]"></i>)}
                                                    <i className="fa-solid fa-star-half-stroke text-gray-300 text-[8px] sm:text-[10px]"></i>
                                                    <i className="fa-regular fa-star text-gray-300 text-[8px] sm:text-[10px]"></i>
                                                    <span className="text-[9px] sm:text-[11px] text-gray-400 ml-1 font-semibold">3.8</span>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {features.map((feature, index) => (
                                        <motion.tr key={index}
                                            className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${index === features.length - 1 ? 'border-b-0' : ''}`}
                                            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: index * 0.04 }}>
                                            <td className="p-3.5 sm:p-5 bg-[var(--bg-light)]">
                                                <div className="flex items-center gap-2.5 sm:gap-3">
                                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                                                        <i className={`fa-solid ${feature.icon} text-[10px] sm:text-xs`}></i>
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">{feature.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-3.5 sm:p-5 text-center bg-[var(--bg-color)]">
                                                {competitors.markt[index] ? (
                                                    <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--secondary-color)]/10 text-[var(--secondary-color)] shadow-sm">
                                                        <i className="fa-solid fa-check text-xs font-bold"></i>
                                                    </div>
                                                ) : <Cross />}
                                            </td>
                                            <td className="p-3.5 sm:p-5 text-center border-l border-gray-100">
                                                {competitors.square[index] ? <Check /> : <Cross />}
                                            </td>
                                            <td className="p-3.5 sm:p-5 text-center border-l border-gray-100">
                                                {competitors.clover[index] ? <Check /> : <Cross />}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Bottom CTA bar */}
                        <div className="px-4 sm:px-8 py-4 sm:py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--bg-color)]">
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-secondary)] text-center sm:text-left">
                                <i className="fa-solid fa-circle-info text-[var(--secondary-color)]"></i>
                                <span>MarktPOS is the <strong className="text-[var(--primary-color)]">only grocery-specific</strong> POS with full feature coverage.</span>
                            </div>
                            <button className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-dark)] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap">
                                Start free trial <i className="fa-solid fa-arrow-right ml-1 text-[10px]"></i>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Trust badges below table */}
                <motion.div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-10 sm:mt-14"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                    {[
                        { icon: "fa-shield-halved", text: "PCI Compliant" },
                        { icon: "fa-lock", text: "256-bit SSL" },
                        { icon: "fa-clock", text: "99.9% Uptime" },
                        { icon: "fa-headset", text: "24/7 Support" },
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                            <i className={`fa-solid ${badge.icon} text-[var(--primary-color)]`}></i>
                            <span className="font-medium">{badge.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
