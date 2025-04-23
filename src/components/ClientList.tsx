import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuArrowDownUp } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import { LuGripVertical } from "react-icons/lu";

type Client = {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    status: "Completed" | "Pending" | "Cancelled";
};

type Sort = "name" | "createdAt" | "clientId" | "updatedAt";
type SortConfig = {
    type: Sort;
    direction: "asc" | "desc";
    id: string; // Unique identifier for drag and drop
};

const clients: Client[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        createdAt: new Date("2024-10-12T10:15:00"),
        updatedAt: new Date("2024-10-15T14:45:00"),
        status: "Completed"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        createdAt: new Date("2024-11-02T09:30:00"),
        updatedAt: new Date("2024-11-03T11:00:00"),
        status: "Pending"
    },
    {
        id: 3,
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        createdAt: new Date("2024-09-20T12:00:00"),
        updatedAt: new Date("2024-09-21T13:25:00"),
        status: "Cancelled"
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@example.com",
        createdAt: new Date("2024-10-05T08:45:00"),
        updatedAt: new Date("2024-10-06T10:00:00"),
        status: "Completed"
    },
    {
        id: 5,
        name: "Michael Johnson",
        email: "michael@example.com",
        createdAt: new Date("2024-10-10T15:20:00"),
        updatedAt: new Date("2024-10-11T16:40:00"),
        status: "Pending"
    },
    {
        id: 6,
        name: "Sophia Miller",
        email: "sophia.miller@example.com",
        createdAt: new Date("2024-09-14T13:00:00"),
        updatedAt: new Date("2024-09-15T14:30:00"),
        status: "Completed"
    },
    {
        id: 7,
        name: "Daniel Anderson",
        email: "daniel.anderson@example.com",
        createdAt: new Date("2024-11-10T10:10:00"),
        updatedAt: new Date("2024-11-11T11:45:00"),
        status: "Cancelled"
    },
    {
        id: 8,
        name: "Olivia Martinez",
        email: "olivia.martinez@example.com",
        createdAt: new Date("2024-12-01T09:00:00"),
        updatedAt: new Date("2024-12-02T10:20:00"),
        status: "Pending"
    },
    {
        id: 9,
        name: "Matthew Taylor",
        email: "matthew.taylor@example.com",
        createdAt: new Date("2024-10-20T12:15:00"),
        updatedAt: new Date("2024-11-26T17:50:00"),
        status: "Completed"
    },
    {
        id: 10,
        name: "Ava Thomas",
        email: "ava.thomas@example.com",
        createdAt: new Date("2024-10-20T12:15:00"),
        updatedAt: new Date("2024-10-21T13:35:00"),
        status: "Cancelled"
    },
    {
        id: 11,
        name: "James Jackson",
        email: "james.jackson@example.com",
        createdAt: new Date("2024-09-01T08:00:00"),
        updatedAt: new Date("2024-09-02T09:25:00"),
        status: "Completed"
    },
    {
        id: 12,
        name: "Isabella White",
        email: "isabella.white@example.com",
        createdAt: new Date("2024-10-08T14:30:00"),
        updatedAt: new Date("2024-10-23T15:55:00"),
        status: "Pending"
    },
    {
        id: 13,
        name: "Joseph Harris",
        email: "joseph.harris@example.com",
        createdAt: new Date("2024-08-19T11:10:00"),
        updatedAt: new Date("2024-08-20T12:30:00"),
        status: "Cancelled"
    },
    {
        id: 14,
        name: "Mia Martin",
        email: "mia.martin@example.com",
        createdAt: new Date("2024-07-15T10:20:00"),
        updatedAt: new Date("2024-11-19T13:55:00"),
        status: "Completed"
    },
    {
        id: 15,
        name: "Benjamin Thompson",
        email: "benjamin.thompson@example.com",
        createdAt: new Date("2024-06-30T13:35:00"),
        updatedAt: new Date("2024-07-01T14:50:00"),
        status: "Pending"
    },
    {
        id: 16,
        name: "Benjamin Thompson",
        email: "benjamin@example.com",
        createdAt: new Date("2024-12-10T09:15:00"),
        updatedAt: new Date("2024-12-11T10:25:00"),
        status: "Completed"
    },
    {
        id: 17,
        name: "Logan Martinez",
        email: "logan.martinez@example.com",
        createdAt: new Date("2024-11-18T12:40:00"),
        updatedAt: new Date("2024-11-19T13:55:00"),
        status: "Cancelled"
    },
    {
        id: 18,
        name: "Ava Thomas",
        email: "ava@example.com",
        createdAt: new Date("2024-10-08T14:30:00"),
        updatedAt: new Date("2024-10-09T15:45:00"),
        status: "Pending"
    },
    {
        id: 19,
        name: "Elijah Lewis",
        email: "elijah.lewis@example.com",
        createdAt: new Date("2024-09-12T10:50:00"),
        updatedAt: new Date("2024-09-13T11:55:00"),
        status: "Completed"
    },
    {
        id: 20,
        name: "Harper Lee",
        email: "harper.lee@example.com",
        createdAt: new Date("2024-08-28T08:05:00"),
        updatedAt: new Date("2024-08-29T09:15:00"),
        status: "Cancelled"
    }
]

// Helper function to get display name for sort type
const getSortTypeName = (type: Sort): string => {
    switch (type) {
        case "name": return "Client Name";
        case "clientId": return "Client ID";
        case "createdAt": return "Created At";
        case "updatedAt": return "Updated At";
        default: return "";
    }
};

// Helper function to get display name for sort direction
const getSortDirectionName = (type: Sort, direction: "asc" | "desc"): string => {
    if (type === "createdAt" || type === "updatedAt") {
        return direction === "asc" ? "Oldest to Newest" : "Newest to Oldest";
    }
    return direction === "asc" ? "A-Z" : "Z-A";
};

// Helper function to generate unique ID
const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
};

function ClientList() {
    const [sortConfigs, setSortConfigs] = useState<SortConfig[]>([{ 
        type: "name", 
        direction: "asc",
        id: generateId()
    }]);
    // @ts-ignore
    const [sortDirections, setSortDirections] = useState<Record<Sort, "asc" | "desc">>({
        name: "asc",
        clientId: "asc",
        createdAt: "asc",
        updatedAt: "asc"
    });
    
    const [open, setOpen] = useState(false);
    const [draggedItem, setDraggedItem] = useState<SortConfig | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const sortedClients = [...clients].sort((a, b) => {
        for (const config of sortConfigs) {
            const dir = config.direction === "asc" ? 1 : -1;
            
            if (config.type === "name") {
                const comparison = a.name.localeCompare(b.name);
                if (comparison !== 0) return comparison * dir;
            } else if (config.type === "clientId") {
                const comparison = a.id - b.id;
                if (comparison !== 0) return comparison * dir;
            } else if (config.type === "createdAt") {
                const comparison = a.createdAt.getTime() - b.createdAt.getTime();
                if (comparison !== 0) return comparison * dir;
            } else if (config.type === "updatedAt") {
                const comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
                if (comparison !== 0) return comparison * dir;
            }
        }
        return 0;
    });

    const handleSort = (sortType: Sort, direction: "asc" | "desc") => {
        // Update the direction for this sort type
        setSortDirections(prev => ({
            ...prev,
            [sortType]: direction
        }));
        
        // Check if this sort type is already in the configs
        const existingIndex = sortConfigs.findIndex(config => config.type === sortType);
        
        if (existingIndex !== -1) {
            // Update existing sort config
            const newConfigs = [...sortConfigs];
            newConfigs[existingIndex] = { 
                type: sortType, 
                direction,
                id: newConfigs[existingIndex].id 
            };
            setSortConfigs(newConfigs);
        } else {
            // Add new sort config
            setSortConfigs([...sortConfigs, { 
                type: sortType, 
                direction,
                id: generateId()
            }]);
        }
    };
    
    const removeSortConfig = (sortType: Sort) => {
        setSortConfigs(sortConfigs.filter(config => config.type !== sortType));
    };

    const isSortActive = (sortType: Sort, direction: "asc" | "desc") => {
        return sortConfigs.some(config => config.type === sortType && config.direction === direction);
    };

    // Drag and drop handlers
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: SortConfig) => {
        setDraggedItem(item);
        e.currentTarget.style.opacity = "0.5";
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = "1";
        setDraggedItem(null);
        setDragOverIndex(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        return false;
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
        e.preventDefault();
        if (!draggedItem) return;
        
        const draggedIndex = sortConfigs.findIndex(config => config.id === draggedItem.id);
        if (draggedIndex === -1) return;
        
        // Create a new array without the dragged item
        const newSortConfigs = sortConfigs.filter(config => config.id !== draggedItem.id);
        
        // Insert the dragged item at the drop position
        newSortConfigs.splice(dropIndex, 0, draggedItem);
        
        // Update state
        setSortConfigs(newSortConfigs);
        setDragOverIndex(null);
    };
    
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <nav>
                    <ul className="flex gap-6 font-semibold text-gray-500">
                        <li className="border-b-2">All</li>
                        <li>Individual</li>
                        <li>Company</li>
                    </ul>
                </nav>
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded hover:bg-gray-100"><IoSearchOutline />
                    </button>
                    <div className="relative">
                        <button onClick={() => setOpen(!open)} className="p-2 rounded hover:bg-gray-100"><LuArrowDownUp /></button>
                        <div className={open ? `absolute block z-10 right-0 mt-2 w-80 bg-white border rounded shadow-md p-4 space-y-3 text-sm` : `absolute hidden z-10 right-0 mt-2 w-80 bg-white border rounded shadow-md p-4 space-y-3 text-sm`}>
                            <div className="font-semibold mb-2">Sort By</div>
                            
                            {/* Active sort configurations */}
                            {sortConfigs.length > 0 && (
                                <div className="mb-4 border-b pb-3">
                                    <div className="font-medium mb-2">Active Sorts (Drag to Change Priority):</div>
                                    {sortConfigs.map((config, index) => (
                                        <div 
                                            key={config.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, config)}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={handleDragOver}
                                            onDragEnter={(e) => handleDragEnter(e, index)}
                                            onDrop={(e) => handleDrop(e, index)}
                                            className={`flex justify-between items-center p-2 rounded mb-1 cursor-move
                                                ${dragOverIndex === index ? "border-2 border-blue-300 bg-blue-50" : "bg-gray-50"}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <LuGripVertical className="text-gray-400" />
                                                <div className="flex-1 ml-1">
                                                    <span className="font-medium">{index + 1}. </span>
                                                    <span>{getSortTypeName(config.type)}: {getSortDirectionName(config.type, config.direction)}</span>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeSortConfig(config.type)}
                                                className="text-gray-500 hover:text-red-500"
                                            >
                                                <IoCloseOutline size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            <div>
                                <label className="flex justify-between items-center">
                                    Client Name
                                    <span className="space-x-1">
                                        <button 
                                            onClick={() => handleSort("name", "asc")}
                                            className={`${isSortActive("name", "asc") ? "bg-blue-100" : ""} px-2 py-1 rounded`}
                                        >A-Z</button>
                                        <button 
                                            onClick={() => handleSort("name", "desc")}
                                            className={`${isSortActive("name", "desc") ? "bg-blue-100" : ""} px-2 py-1 rounded`}
                                        >Z-A</button>
                                    </span>
                                </label>
                            </div>
                            <div>
                                <label className="flex justify-between items-center">
                                    Client Id
                                    <span className="space-x-1">
                                        <button 
                                            onClick={() => handleSort("clientId", "asc")}
                                            className={`${isSortActive("clientId", "asc") ? "bg-blue-100" : ""} px-2 py-1 rounded`}
                                        >A-Z</button>
                                        <button 
                                            onClick={() => handleSort("clientId", "desc")}
                                            className={`${isSortActive("clientId", "desc") ? "bg-blue-100" : ""} px-2 py-1 rounded`}
                                        >Z-A</button>
                                    </span>
                                </label>
                            </div>
                            <div>
                                <label className="flex justify-between items-center">
                                    Created At
                                    <span className="space-x-1">
                                        <button 
                                            onClick={() => handleSort("createdAt", "asc")}
                                            className={`${isSortActive("createdAt", "asc") ? "bg-blue-100" : ""} px-2 py-1 rounded`}
                                        >Oldest to Newest</button>
                                        <button 
                                            onClick={() => handleSort("createdAt", "desc")}
                                            className={`${isSortActive("createdAt", "desc") ? "bg-blue-100" : ""} px-2 py-1 rounded`}
                                        >Newest to Oldest</button>
                                    </span>
                                </label>
                            </div>
                            <div>
                                <label className="flex justify-between items-center">
                                    Updated At
                                    <span className="space-x-1">
                                        <button 
                                            onClick={() => handleSort("updatedAt", "asc")}
                                            className={`${isSortActive("updatedAt", "asc") ? "bg-blue-100" : ""} px-2 py-1 rounded`}
                                        >Oldest to Newest</button>
                                        <button 
                                            onClick={() => handleSort("updatedAt", "desc")}
                                            className={`${isSortActive("updatedAt", "desc") ? "bg-blue-100" : ""} px-2 py-1 rounded`}
                                        >Newest to Oldest</button>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button className="p-2 rounded hover:bg-gray-100"><CiFilter />
                    </button>
                    <button className="bg-black text-white px-4 py-2 rounded">+ Add Client</button>
                </div>
            </div>
            <div className="border border-gray-200 rounded-xl flex flex-col gap-4 px-4">
                <div className="grid grid-template-cols-none gap-4 font-semibold py-2 px-2 border-b border-gray-200" style={{ gridTemplateColumns: '1fr 1fr 1.5fr 1fr 1fr 1fr' }}>
                    <div className="flex items-center gap-8"><TbLayoutSidebarLeftCollapse />Client ID</div>
                    <div>Client Name</div>
                    <div>Email</div>
                    <div>Status</div>
                    <div>Created At</div>
                    <div>Updated At</div>
                </div>

                {sortedClients.map((client) => (
                    <div key={client.id} className="grid grid-template-cols-none gap-4 items-center border-b border-gray-200 py-2 text-sm" style={{ gridTemplateColumns: '1fr 1fr 1.5fr 1fr 1fr 1fr' }}>
                        <div className="text-blue-600 text-center">{client.id}</div>
                        <div>{client.name}</div>
                        <div className="truncate">{client.email}</div>
                        <div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{client.status}</span>
                        </div>
                        <div>{client.createdAt.toLocaleString()}</div>
                        <div>{client.updatedAt.toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClientList;