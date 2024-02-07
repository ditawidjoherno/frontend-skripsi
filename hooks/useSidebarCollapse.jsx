"use client";

import { useState } from "react";

const useSidebarCollapse = () => {

    const [isCollapse, setIsCollapse] = useState(false);

    return { isCollapse, setIsCollapse }
}

export default useSidebarCollapse
