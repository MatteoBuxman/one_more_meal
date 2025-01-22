const baseItems ={
    navMain: [
        {
            title: "Support Us.",
            
            items: [
                {
                    title: "Donate",
                    url: "#",
                },
                
            ],
        },
        {
            title: "Purchase meal packaging.",
            
            items: [
                {
                    title: "Store",
                    url: "/store",
                },
                
            ],
        },
        {
            title: "More Information.",
            
            items: [
                {
                    title: "About",
                    url: "/about",
                },
                {
                    title: "Legal",
                    url: "/legal",
                },
                {
                    title: "Cookie Policy",
                    url: "/cookies",
                },
            ],
        },
        {
            title: "Get in touch.",
            
            items: [
                {
                    title: "Contact Us",
                    url: "/contact",
                },
            ],
        },
    ]
}








export const signedOutItems = {
    navMain: [
        {
            title: "Sign In to get started.",
            
            items: [
                {
                    title: "Sign In",
                    url: "/signin",
                },
                
            ],
        },
        
        ...baseItems.navMain,
        
    ],
};

export const signedInItems = {
    navMain: [
        {
            title: "Your Account",
            
            items: [
                {
                    title: "Go to your dashboard.",
                    url: "/dashboard",
                },
                {
                    title: "Make a new donation.",
                    url: "/newmeal",
                },
                {
                    title: "Account Settings",
                    url: "/usersettings",
                },
            ],
        },
        
        ...baseItems.navMain,
        {
            title: "Authentication",
            
            items: [
                {
                    title: "Sign Out",
                    url: "/signout",
                },
                
            ],
        }
    ],
}