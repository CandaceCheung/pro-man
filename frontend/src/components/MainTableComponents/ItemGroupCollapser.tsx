interface ItemGroupCollapserProps {
    size: number;
    className: string;
}

export function ItemGroupCollapser(props: ItemGroupCollapserProps) {
    return (
        <svg className={props.className} viewBox={`0 0 ${props.size} ${props.size}`} fill="currentColor" width={props.size} height={props.size} role="button" aria-hidden="false">
            <path d="M12.5303 9.46967L12 10L12.5303 10.5303C12.8232 10.2374 12.8232 9.76256 12.5303 9.46967ZM10.9393 10L7.46967 13.4697C7.17678 13.7626 7.17678 14.2374 7.46967 14.5303C7.76256 14.8232 8.23744 14.8232 8.53033 14.5303L12.5303 10.5303L12 10L12.5303 9.46967L8.53033 5.46967C8.23744 5.17678 7.76256 5.17678 7.46967 5.46967C7.17678 5.76256 7.17678 6.23744 7.46967 6.53033L10.9393 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
    )
}