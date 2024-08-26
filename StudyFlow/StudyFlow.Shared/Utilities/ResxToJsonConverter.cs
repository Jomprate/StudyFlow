using System.Xml;
using Newtonsoft.Json;

public class ResxToJsonConverter
{
    public static void Convert(string resxFilePath, string jsonFilePath)
    {
        var dict = new Dictionary<string, string>();

        using (XmlReader reader = XmlReader.Create(resxFilePath))
        {
            while (reader.Read())
            {
                if (reader.NodeType == XmlNodeType.Element && reader.Name == "data")
                {
                    string key = reader.GetAttribute("name");
                    reader.ReadToDescendant("value");
                    string value = reader.ReadElementContentAsString();
                    dict[key] = value;
                }
            }
        }

        var json = JsonConvert.SerializeObject(dict, Newtonsoft.Json.Formatting.Indented);
        File.WriteAllText(jsonFilePath, json);
    }
}