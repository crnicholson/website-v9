export default function Badge(children: {children: React.ReactNode}) {
    return (
        <span className="bg-gray-50 text-gray-800 border border-gray-300 px-2 py-1 rounded-full text-xs font-medium">
            {children.children}
        </span>
    )
}