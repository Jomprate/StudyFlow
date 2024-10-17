using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using StudyFlow.DAL.Data;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder().
            SetBasePath(Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "StudyFlow.Backend")).
            AddJsonFile("appsettings.json", optional: false, reloadOnChange: true).Build();

        var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
        optionsBuilder.UseSqlServer(configuration.GetConnectionString("StudyFlowDB"),
            b => b.MigrationsAssembly("StudyFlow.DAL"));

        return new DataContext(optionsBuilder.Options);
    }
}