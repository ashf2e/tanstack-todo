import { cn } from '#/lib/utils'

interface Props {
  q: string
  filter: string
  sort: string

  onSearch: (value: string) => void
  onFilterChnage: (value: string) => void
  onSortChange: (value: string) => void
}

export const TodoToolbar = (props: Props) => {
  return (
    <div className="space-y-2">
      <input
        type="text"
        value={props.q}
        onChange={(e) => props.onSearch(e.target.value)}
        placeholder="Search..."
        className={cn('border', 'rounded', 'px-3 py-2', 'w-full')}
      />

      <div className="flex gap-2">
        <select
          value={props.filter}
          onChange={(e) => props.onFilterChnage(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={props.sort}
          onChange={(e) => props.onSortChange(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A-Z</option>
        </select>
      </div>
    </div>
  )
}
