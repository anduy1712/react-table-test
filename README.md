# Table Editor - Infinite Scroll

A lightweight, production-ready table editor built with React 18, TypeScript, and modern web technologies. Features infinite scroll lazy loading from a public JSON endpoint.

## Features

- ✅ **Infinite Scroll**: Lazy load data as users scroll
- ✅ **Editable Cells**: Click to edit any cell inline
- ✅ **Expandable Rows**: View full content in expanded detail view
- ✅ **Search**: Filter rows across all columns
- ✅ **Export**: Download visible data as CSV
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Performance**: Efficient rendering with batched loading
- ✅ **Responsive**: Works on desktop and tablet

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 18 + Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Language**: TypeScript

## Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone <repo-url>
cd table-editor

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

The app will be available at `http://localhost:3000`

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Usage

1. **Load Data**: Click the "Load Data" button to fetch data from the JSON endpoint
2. **Scroll**: Scroll down to automatically load more rows (50 rows per batch)
3. **Edit**: Click any cell to edit inline
4. **Expand**: Click the chevron icon to see full row details
5. **Search**: Use the search box to filter rows
6. **Export**: Click "Export" to download data as CSV

## Architecture & Design Decisions

### State Management (Zustand)
- **Why**: Lightweight, minimal boilerplate, perfect for this use case
- **Trade-off**: No time-travel debugging like Redux, but simpler for smaller apps

### Infinite Scroll Implementation
- **Approach**: Intersection Observer API for efficient scroll detection
- **Batch Size**: 50 rows per load (configurable via `BATCH_SIZE`)
- **Trade-off**: Fixed batch size vs. dynamic sizing - fixed is simpler and more predictable

### Data Caching
- **Strategy**: In-memory cache after first fetch
- **Trade-off**: No persistence between sessions, but faster subsequent loads
- **Future**: Could add IndexedDB for persistent caching

### Inline Editing
- **Approach**: Controlled inputs with Zustand state updates
- **Trade-off**: No undo/redo, but simpler implementation
- **Future**: Could add history stack for undo support

### Search Implementation
- **Approach**: Client-side filtering across all columns
- **Trade-off**: Works well for current dataset size, would need server-side for millions of rows
- **Optimization**: Resets pagination when searching

### CSV Export
- **Approach**: Client-side generation using Blob API
- **Trade-off**: Limited to displayed rows, not entire dataset
- **Future**: Could add server-side export for large datasets

## Performance Considerations

1. **Lazy Loading**: Only renders visible rows + buffer
2. **Intersection Observer**: Efficient scroll detection without throttling
3. **Zustand**: Minimal re-renders with selective subscriptions
4. **CSS**: Tailwind with PurgeCSS removes unused styles
5. **Batch Size**: 50 rows balances UX and performance

## Browser Support

- Chrome/Edge 51+
- Firefox 55+
- Safari 12.1+
- Requires Intersection Observer API support

## Future Enhancements

- [ ] Server-side pagination for very large datasets
- [ ] Multi-column sorting
- [ ] Advanced filtering with operators
- [ ] Undo/redo history
- [ ] Keyboard shortcuts
- [ ] Bulk row operations
- [ ] Column resizing
- [ ] Dark mode
- [ ] Row selection with checkboxes
- [ ] Data validation rules

## Troubleshooting

### Data not loading
- Check browser console for CORS errors
- Verify the JSON endpoint is accessible
- Try clearing browser cache

### Slow performance
- Reduce `BATCH_SIZE` in `lib/store.ts`
- Check browser DevTools Performance tab
- Consider server-side pagination for datasets > 100k rows

### Search not working
- Ensure data is loaded first
- Check that column names match exactly
- Try searching with partial text

## License

MIT

## Author

Built as a production-ready table editor example.
