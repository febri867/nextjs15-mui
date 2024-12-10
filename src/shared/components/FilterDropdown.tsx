import { FilterAlt } from '@mui/icons-material'
import {
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  FormGroup,
  Paper,
  PaperProps,
  Popper,
  PopperProps,
  Switch,
  Typography,
} from '@mui/material'
// import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'

type FilterDataItem = string | { label: string; active: boolean }

type FilterDataType = {
  [key in string]: Array<FilterDataItem>
}

interface FilterDropdownProps {
  open: boolean
  id?: string
  paperProps?: PaperProps
  popperProps?: PopperProps
  handleClose: () => void
  handleOpen: () => void
  buttonLabel?: string
  data: FilterDataType
  keyMap?: Record<string, string>
}

function FilterDropdown({
  open,
  id,
  paperProps,
  popperProps,
  handleClose,
  handleOpen,
  data,
  keyMap,
  buttonLabel = 'Filter',
}: FilterDropdownProps) {
  const [filterAnchor, setFilterAnchor] = useState<HTMLButtonElement | null>(null)
  const router = useRouter()
  router.query.limit = '10'

  const convertQueryToFilterDataType = (
    query: Record<string, string>,
  ): FilterDataType => {
    const filterData: FilterDataType = {}
    for (const key in query) {
      if (key === 'limit') continue
      if (query[key].includes(',')) {
        filterData[key] = query[key].split(',')
      } else {
        const isGrouped = Object.keys(data).some((label) => {
          return (
            data[label].some((member) => typeof member !== 'string') &&
            data[label].some(
              (member) => typeof member !== 'string' && member.label === key,
            )
          )
        })
        let isMemberOfGroup: string[] = []
        if (isGrouped) {
          const groupedKeys = Object.keys(data)
            .map((label) => {
              return (
                data[label].some((member) => typeof member !== 'string') && [
                  label,
                  data[label],
                ]
              )
            })
            .filter(Boolean)

          groupedKeys.forEach((item) => {
            const [groupLabel, members] = item as [string, FilterDataItem[]]
            const memberKeys = members.map((item) => {
              if (typeof item !== 'string') return item.label
            })
            isMemberOfGroup = memberKeys as string[]
            const isGroupItemOnQuery = members.some(
              (member) => typeof member !== 'string' && member.label === key,
            )

            if (isGroupItemOnQuery) {
              const formattedGroupLabel = groupLabel.toLowerCase()
              const updatedMembers = members
                .map((member) => {
                  if (typeof member !== 'string' && member.label === key) {
                    return { label: key, active: Boolean(+query[key]) }
                  }
                  return member
                })
                .filter((item) => typeof item !== 'string' && item.label === key)

              filterData[formattedGroupLabel] = [
                ...(filterData[formattedGroupLabel] || []),
                ...updatedMembers,
              ]
            }
          })
        }

        if (isMemberOfGroup.includes(key)) continue
        filterData[key] = [query[key]]
      }
    }
    return filterData
  }

  const filterDataFromQuery: FilterDataType = convertQueryToFilterDataType(
    router.query as Record<string, string>,
  )

  const [selectedFilter, setSelectedFilter] =
    useState<FilterDataType>(filterDataFromQuery)

  useEffect(() => {
    if (router.isReady) {
      setSelectedFilter(filterDataFromQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  const handleOpenFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchor(event.currentTarget)
    handleOpen()
  }

  const handleCloseFilter = () => {
    setFilterAnchor(null)
    handleClose()
  }

  const handleResetFilter = () => {
    setSelectedFilter({})
    router.replace(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { scroll: false },
    )
    handleClose()
  }

  const handleSelected = (
    event: ChangeEvent<HTMLInputElement>,
    label: string,
    value: FilterDataItem,
  ) => {
    label = keyMap ? label : label.toLocaleLowerCase()
    const selected = selectedFilter
    const currentQuery = router.query
    if (typeof value === 'string') {
      if (event.target.checked) {
        selected[label] = selected[label] ? [...selected[label], value] : [value]
        currentQuery[label] = selected[label].join(',')
        router.query = currentQuery
      } else {
        selected[label] = selected[label].filter((item) => item !== value)
        currentQuery[label] = selected[label].join(',')
        if (currentQuery[label]?.length === 0) delete currentQuery[label]
        router.query = currentQuery
      }
    } else {
      if (event.target.checked) {
        selected[label] = selected[label] ? [...selected[label], value] : [value]
        currentQuery[value.label] = String(+value.active)
        router.query = currentQuery
      } else {
        selected[label] = selected[label].filter(
          (item) =>
            (item as { label: string; active: boolean }).label !== value.label,
        )
        delete currentQuery[value.label]
        router.query = currentQuery
      }
    }

    setSelectedFilter(selected)
    router.replace(
      {
        pathname: router.pathname,
        query: router.query,
      },
      undefined,
      { scroll: false },
    )
  }

  const handleSwitchChange = (
    event: ChangeEvent<HTMLInputElement>,
    label: string,
  ) => {
    router.query[label] = String(+event.target.checked)
    router.replace(
      {
        pathname: router.pathname,
        query: router.query,
      },
      undefined,
      { scroll: false },
    )
  }

  return (
    <ClickAwayListener onClickAway={handleCloseFilter}>
      <Box position="relative">
        <Button
          onClick={handleOpenFilter}
          size="large"
          variant="outlined"
          endIcon={<FilterAlt />}
        >
          {buttonLabel}
        </Button>
        <Popper
          id={id ? 'filterDropdown' : id}
          open={open}
          anchorEl={filterAnchor}
          disablePortal={false}
          placement="top-end"
          modifiers={[
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['bottom-end'],
              },
            },
          ]}
          {...popperProps}
        >
          <Paper sx={{ minWidth: '440px', padding: 2 }} {...paperProps}>
            <Box display="flex" flexDirection="column" gap={2}>
              {Object.keys(data).map((label, index) => (
                <Box key={index} display="flex" flexDirection="column" gap={1}>
                  <Typography fontSize={14} color="text.disabled">
                    {keyMap ? keyMap[label] ?? label : label}
                  </Typography>
                  <FormGroup
                    sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                  >
                    {data[label].map((item, index) => {
                      const isIncluded =
                        typeof item === 'string'
                          ? selectedFilter[label.toLowerCase()]?.includes(item)
                          : selectedFilter[label.toLowerCase()]?.some(
                              (opt) =>
                                typeof opt !== 'string' && opt.label === item.label,
                            )

                      const isItemString = typeof item === 'string'

                      const showSwitch =
                        !isItemString &&
                        selectedFilter[label.toLowerCase()]?.some(
                          (opt) =>
                            typeof opt !== 'string' && opt.label === item.label,
                        )
                      return (
                        <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isIncluded}
                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                  handleSelected(event, label, item)
                                }
                                sx={{ padding: '0px 9px' }}
                              />
                            }
                            label={typeof item === 'string' ? item : item?.label}
                          />
                          {showSwitch && (
                            <Switch
                              size="small"
                              checked={
                                item.active ||
                                Boolean(
                                  +(router.query[item.label] as unknown as number),
                                )
                              }
                              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleSwitchChange(event, item.label)
                              }
                            />
                          )}
                        </Box>
                      )
                    })}
                  </FormGroup>
                </Box>
              ))}
            </Box>
            {Object.keys(selectedFilter).length > 0 && (
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap="0 12px"
                mt={2}
              >
                <Button variant="text" onClick={handleResetFilter}>
                  Hapus Filter
                </Button>
              </Box>
            )}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}

export default FilterDropdown
