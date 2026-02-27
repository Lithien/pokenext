'use client'

import { ArrowRightAlt } from "@mui/icons-material"
import { Box, Container, Grid, Skeleton, Typography, Chip } from "@mui/material"
import { useTheme } from "@mui/material"

import useChainEvolution from "./hooks/useChainEvolution"
import PokemonCard from "./PokemonCard"

import { Pokemon, PokemonSpecies, ChainLink, EvolutionDetail } from "@/api/types"
import { ITEM_IMAGE_URL } from "@/constants"
import { getItem } from "@/utils"


interface ChainEvolutionProps {
  pokemon: Pokemon
  species: PokemonSpecies
}

const ChainEvolution = ({ species }: ChainEvolutionProps) => {
  const theme = useTheme()

  const { requeriments, chain, isLoading } = useChainEvolution({ species })

  // ------------------------------------------------------
  // Requisitos de evolución
  // ------------------------------------------------------
  const renderRequirements = (details: EvolutionDetail[]) => {
    const reqs: string[] | null = requeriments(details)
    const item = getItem(details?.[0])

    return (
      <Box
        display="flex"
        gap={1}
        flexWrap="wrap"
        justifyContent="center"
        mt={1}
        sx={{ animation: "fadeIn 0.5s ease" }}
      >
        {item && (
          <Chip
            key={item}
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <img
                  src={`${ITEM_IMAGE_URL}${item}.png`}
                  alt={item}
                  width={24}
                  height={24}
                />
              </Box>
            }
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "inherit",
              backdropFilter: "blur(4px)",
            }}
          />
        )}

        {reqs
          ?.filter((r) => !r.startsWith("Item: ") && !r.startsWith("Hold"))
          .map((r) => (
            <Chip
              key={r}
              label={r}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "inherit",
                backdropFilter: "blur(4px)",
              }}
            />
          ))}
      </Box>
    )
  }

  // ------------------------------------------------------
  // Renderizado recursivo del árbol evolutivo (horizontal)
  // ------------------------------------------------------
  const renderChain = (node: ChainLink, depth = 0) => {
    return (
      <Box
        key={node.species.name}
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={1}
        sx={{
          p: 1,
          borderRadius: 2,
          animation: `fadeIn 0.6s ease ${depth * 0.2}s`,
          
        }}
      >
        <PokemonCard {...node.species} />

        {node.evolves_to.length > 0 && (
          <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
            {node.evolves_to.map((child) => (
              <Box
                key={child.species.name}
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={1}
              >
                <Typography
                  variant="h4"
                  sx={{
                    opacity: 0.6,
                    animation: "arrowBounce 1.2s infinite ease-in-out",
                  }}
                >
                  <ArrowRightAlt fontSize="large" />
                </Typography>

                {renderRequirements(child.evolution_details)}

                {renderChain(child, depth + 1)}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    )
  }

  // ------------------------------------------------------
  // Render principal
  // ------------------------------------------------------
  return (
    <Container sx={{ py: 4 }} maxWidth="md">

      <Typography
        variant="h6"
        fontWeight="bold"
        textAlign="center"
        mb={3}
        sx={{ opacity: 0.9 }}
      >
        Evolution Chain
      </Typography>

      <Box
        sx={{
          background: `linear-gradient(to right, ${theme.palette.primary.main}, rgb(32, 32, 32))`,
          p: 2,
          borderRadius: 3,
          width: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          {isLoading ? (
            <Box display="flex" gap={2}>
              <Skeleton variant="rounded" width={110} height={170} />
              <Skeleton variant="rounded" width={110} height={170} />
              <Skeleton variant="rounded" width={110} height={170} />
            </Box>
          ) : (
            chain && renderChain(chain)
          )}
        </Box>
      </Box>


      {/* Variantes */}
      {species.varieties.length > 1 && (
        <>
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            mt={6}
            mb={3}
            sx={{ opacity: 0.9 }}
          >
            Alternate Forms
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {species.varieties.map((variety) => (
              <Grid key={variety.pokemon.name}>
                <PokemonCard {...variety.pokemon} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  )
}

export default ChainEvolution