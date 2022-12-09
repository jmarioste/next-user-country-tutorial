import { GetServerSideProps, NextPage } from "next";
import React from "react";

type Props = {
  ip: string;
};

const SSRPage: NextPage<Props> = ({ ip }) => {
  return <div>IP: {ip}</div>;
};

export default SSRPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let ip = req.headers["x-real-ip"];
  if (!ip) {
    const forwardedFor = req.headers["x-forwarded-for"];
    if (Array.isArray(forwardedFor)) {
      ip = forwardedFor.at(0);
    } else {
      ip = forwardedFor?.split(",").at(0) ?? "Unknown";
    }
  }

  return {
    props: {
      ip,
    },
  };
};
