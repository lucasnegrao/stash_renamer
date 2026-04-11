"""GraphQL query and mutation definitions for stash_renamer."""

INTROSPECTION_TYPE_QUERY = """
query IntrospectType($typeName: String!) {
  __type(name: $typeName) {
    name
    fields {
      name
      type {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
          }
        }
      }
    }
  }
}
"""

MOVE_FILES_MUTATION = """
mutation moveFiles($input: MoveFilesInput!) {
  moveFiles(input: $input)
}
"""

FIND_SCENE_FILES_BY_ID_QUERY = """
query findScene($id: ID!) {
  findScene(id: $id) {
    id
    files {
      id
      path
    }
  }
}
"""

FIND_TAGS_QUERY = """
query findTags($filter: FindFilterType!, $tag_filter: TagFilterType!) {
  findTags(filter: $filter, tag_filter: $tag_filter) {
    tags { id name }
  }
}
"""

FIND_SCENES_COUNT_QUERY = """
query findScenes($filter: FindFilterType!, $scene_filter: SceneFilterType!) {
  findScenes(filter: $filter, scene_filter: $scene_filter) {
    count
  }
}
"""

FIND_SCENES_PAGE_QUERY = """
query findScenes($filter: FindFilterType!, $scene_filter: SceneFilterType!) {
  findScenes(filter: $filter, scene_filter: $scene_filter) {
    scenes {
      id
      title
      code
      details
      director
      urls
      date
      rating100
      organized
      o_counter
      interactive
      interactive_speed
      created_at
      updated_at
      last_played_at
      resume_time
      play_duration
      play_count
      files { id path }
      studio { name }
      performers { name gender }
      tags { name }
      groups { group { id name } }
      scene_markers { id }
      stash_ids { stash_id }
    }
  }
}
"""
