"use client";

import React from "react";

export function AnimatedClouds() {
    return (
        <div 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
                background: "linear-gradient(to bottom, #60a5fa 0%, #bfdbfe 60%, var(--background) 100%)"
            }}
        >
            <div className="absolute inset-0 w-full h-full opacity-80 cloud-images" />
            <style>{`
                .cloud-images {
                    background-image: 
                        url("data:image/svg+xml,%3Csvg width='1000' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='b1'%3E%3CfeGaussianBlur stdDeviation='10' /%3E%3C/filter%3E%3Cpath fill='%23ffffff' filter='url(%23b1)' opacity='0.9' d='M250 300 Q150 300 150 200 Q150 120 250 120 Q300 50 450 50 Q600 50 650 120 Q750 120 750 200 Q750 300 650 300 Z'/%3E%3C/svg%3E"),
                        url("data:image/svg+xml,%3Csvg width='1200' height='500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='b2'%3E%3CfeGaussianBlur stdDeviation='15' /%3E%3C/filter%3E%3Cpath fill='%23ffffff' filter='url(%23b2)' opacity='0.6' d='M300 350 Q180 350 180 250 Q180 150 300 150 Q380 70 550 70 Q720 70 800 150 Q920 150 920 250 Q920 350 800 350 Z'/%3E%3C/svg%3E"),
                        url("data:image/svg+xml,%3Csvg width='1000' height='450' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='b3'%3E%3CfeGaussianBlur stdDeviation='20' /%3E%3C/filter%3E%3Cpath fill='%23ffffff' filter='url(%23b3)' opacity='0.4' d='M200 320 Q100 320 100 220 Q100 140 200 140 Q250 70 400 70 Q550 70 600 140 Q700 140 700 220 Q700 320 600 320 Z'/%3E%3C/svg%3E");
                    background-size: 1000px auto, 1200px auto, 1000px auto;
                    background-repeat: repeat-x;
                    background-position: 0 150px, 0 250px, 100px 200px;
                    animation: wind 25s linear infinite;
                }
                @keyframes wind {
                    0% {
                        background-position: 0 150px, 0 250px, 100px 200px;
                    }
                    100% {
                        background-position: 1000px 150px, 1200px 250px, 1100px 200px;
                    }
                }
            `}</style>
        </div>
    );
}
