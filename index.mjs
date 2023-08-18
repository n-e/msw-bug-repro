import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
    rest.get('*/blah', (req, res, ctx) => {
        return res(
            ctx.delay(2000),
            ctx.json(
                { a: 'b' }
            ),
        )
    }),
)

server.listen()

// Returns after 2 seconds, doesn't throw.
// If server.listen() above is commented, it throws.
await fetch('https://example.com/blah', { signal: AbortSignal.timeout(1) })
