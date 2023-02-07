import SignClient from "@walletconnect/sign-client";

export const signClient = await SignClient.init({
    projectId: "70f4c011426d1106a21bf3fb1b3530b6",
    // metadata: {
    //     name: "Test Wallet",
    //     description: "Test Wallet",
    //     url: "https://forentechnologies.com/",
    //     icons: ["https://walletconnect.com/walletconnect-logo.png"],
    // },
});