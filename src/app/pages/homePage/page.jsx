"use client";

import Sidebar from '../../components/sidebar';
import DashboardHome from '../../components/DashboardHome';
import HostingStart from '../gitconnect/page';
import DeployPage from '../gitconnect2/page';
import SetupDeployPage from '../buildfromgit/page'; 
export default function Home() {
  return (
    <main className="flex bg-black">
      <Sidebar />
      <DashboardHome />
      {/* <HostingStart/> */}
      {/* <DeployPage /> */}
      {/* <SetupDeployPage /> */}
    </main>
  );
}
