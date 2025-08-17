export default function PrivacyBadge({ isPublic }: { isPublic: boolean }) {
    return (
        <span
            className={`px-2 py-1 text-xs font-medium rounded-md ${isPublic
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-gray-200 text-gray-600 border border-gray-300"
                }`}
        >
            {isPublic ? "Public" : "Private"}
        </span>
    );
}
